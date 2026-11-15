import NextLink from "next/link";
import type { ComponentProps } from "react";
/** The teaching API has a shared-IP rate limit. Fetch only pages the user opens. */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} prefetch={false} />;
}
