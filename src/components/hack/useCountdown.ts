import { useEffect, useState } from "react";

// Registration closes: 17 Sep 2026, 11:59:59 PM IST
export const REGISTRATION_DEADLINE = new Date("2026-09-17T23:59:59+05:30").getTime();

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  formatted: string;
  compact: string;
  isExpired: boolean;
}

export function calculateTimeRemaining(target = REGISTRATION_DEADLINE): TimeRemaining {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    formatted: `${days}D ${hh}H ${mm}M ${ss}S`,
    compact: `${days}d ${hh}:${mm}:${ss}`,
    isExpired: diff <= 0,
  };
}

/**
 * Live ticking countdown hook updating every 1000ms.
 */
export function useCountdown(target = REGISTRATION_DEADLINE): TimeRemaining {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeRemaining(target));

  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(target));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return timeLeft;
}

/**
 * Live animated number counter for registered users (e.g. 0 -> 421).
 */
export function useAnimatedCount(target = 421, duration = 1200): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const tick = (now: number) => {
      if (!startTimestamp) startTimestamp = now;
      const elapsed = now - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Exponential ease-out
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return count;
}
