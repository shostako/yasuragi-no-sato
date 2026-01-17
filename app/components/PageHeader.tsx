"use client";

import { PageContentProvider } from "../contexts/PageContentContext";
import { EditableText } from "./EditableText";

interface PageHeaderProps {
  pageId: string;
  labelKey: string;
  titleKey: string;
  descriptionKey: string;
  defaultLabel: string;
  defaultTitle: string;
  defaultDescription: string;
}

function PageHeaderContent({
  labelKey,
  titleKey,
  descriptionKey,
  defaultLabel,
  defaultTitle,
  defaultDescription,
}: Omit<PageHeaderProps, "pageId">) {
  return (
    <section className="pt-32 pb-16 bg-gradient-warm texture-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <EditableText
            contentKey={labelKey}
            defaultValue={defaultLabel}
            as="p"
            className="text-[var(--color-accent)] text-sm font-medium tracking-wider mb-2"
          />
          <EditableText
            contentKey={titleKey}
            defaultValue={defaultTitle}
            as="h1"
            className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4"
          />
          <EditableText
            contentKey={descriptionKey}
            defaultValue={defaultDescription}
            as="p"
            className="text-[var(--color-text-muted)] max-w-2xl mx-auto"
            multiline
          />
        </div>
      </div>
    </section>
  );
}

export function PageHeader(props: PageHeaderProps) {
  const { pageId, ...rest } = props;
  return (
    <PageContentProvider pageId={pageId}>
      <PageHeaderContent {...rest} />
    </PageContentProvider>
  );
}
