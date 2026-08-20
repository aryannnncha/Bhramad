import { AssistantChat } from '@/components/assistant-chat';

export default function AssistantPage() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <AssistantChat />
      </div>
    </section>
  );
}
