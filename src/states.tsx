/*
 *  Copyright 2025-2026 Colliery Software
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Shared loading / empty / error primitives. Every async view uses these — no
 *  indefinite spinners, no blank error screens. The error component renders by
 *  classified kind.
 */

import { Alert, Button, Center, Loader, Stack, Text } from "@mantine/core";

import { classifyError } from "./errors";

export function Loading({ label = "Loading…" }: { label?: string }) {
  return (
    <Center mih={160} aria-busy="true">
      <Stack align="center" gap="xs">
        <Loader color="ice" />
        <Text c="dimmed" size="sm">
          {label}
        </Text>
      </Stack>
    </Center>
  );
}

export function Empty({ message }: { message: string }) {
  return (
    <Center mih={160}>
      <Text c="dimmed">{message}</Text>
    </Center>
  );
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const c = classifyError(error);
  const title =
    c.kind === "auth"
      ? "Not authorized"
      : c.kind === "notfound"
        ? "Not found"
        : c.kind === "validation"
          ? "Invalid request"
          : c.kind === "network"
            ? "Cannot reach server"
            : "Something went wrong";
  const retryable = c.kind === "server" || c.kind === "network";
  return (
    <Alert color={c.kind === "validation" ? "gold" : "bad"} title={title} role="alert">
      <Stack gap="xs">
        <Text size="sm">{c.message}</Text>
        {c.code && (
          <Text size="xs" c="dimmed">
            code: {c.code}
          </Text>
        )}
        {retryable && onRetry && (
          <Button size="xs" variant="light" color="ice" onClick={onRetry} w="fit-content">
            Retry
          </Button>
        )}
      </Stack>
    </Alert>
  );
}
