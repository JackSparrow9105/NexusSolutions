import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRODUCTS, getCategory } from '../product-data';
import { openWhatsAppLink } from '../whatsapp';
import { AI_ENDPOINT, AI_SUGGESTIONS, AI_WELCOME } from '../ai-config';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss']
})
export class AiAssistantComponent {
  @ViewChild('scrollArea') scrollArea?: ElementRef<HTMLDivElement>;
  @ViewChild('chatInput') chatInput?: ElementRef<HTMLTextAreaElement>;

  readonly enabled = !!AI_ENDPOINT;
  readonly welcome = AI_WELCOME;
  readonly suggestions = AI_SUGGESTIONS;
  readonly maxInput = 500;

  open = false;
  loading = false;
  draft = '';
  error = '';
  messages: ChatMessage[] = [];

  // Compact catalogue sent with each request so the AI only recommends products we actually sell
  private readonly catalog = PRODUCTS.map(p => ({
    title: p.title,
    ...(p.code ? { code: p.code } : {}),
    category: getCategory(p.category)?.name,
    description: p.description,
    specs: p.specs.map(s => `${s.label}: ${s.value}`).join('; ')
  }));

  toggle(): void {
    this.open = !this.open;
    if (this.open) setTimeout(() => this.chatInput?.nativeElement.focus(), 50);
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.open = false;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  async send(text?: string): Promise<void> {
    const content = (text ?? this.draft).trim().slice(0, this.maxInput);
    if (!content || this.loading) return;

    this.error = '';
    this.draft = '';
    this.messages.push({ role: 'user', content });
    this.loading = true;
    this.scrollToBottom();

    try {
      const res = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // keep only the last 10 turns to limit cost
        body: JSON.stringify({ messages: this.messages.slice(-10), catalog: this.catalog })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) {
        if (data.details) console.error('AI assistant details:', data.details);
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      this.messages.push({ role: 'assistant', content: data.reply });
    } catch (e) {
      console.error('AI assistant error', e);
      this.error = 'Sorry, the assistant is not available right now. Please call +91 8905302210 or use WhatsApp.';
    } finally {
      this.loading = false;
      this.scrollToBottom();
    }
  }

  /** Hand the conversation over to a human sales person on WhatsApp */
  continueOnWhatsApp(): void {
    const questions = this.messages.filter(m => m.role === 'user').map(m => `• ${m.content}`).join('\n');
    openWhatsAppLink(
      `Hello Nexus Solutions,\n\nI was using the AI assistant on your website and would like a quotation.` +
      (questions ? `\n\nMy questions:\n${questions}` : '')
    );
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.scrollArea?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 30);
  }
}
