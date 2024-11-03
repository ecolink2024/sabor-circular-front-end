import { keyframes } from "@emotion/react";

export const scrollAnimation = keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(-100%);
}
`;

export const getTokenFromPathname = (pathname: string): string | null => {
  const match = pathname.match(/\/login\/recovery-password\/(.+)/);
  return match ? match[1] : null;
};
