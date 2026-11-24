import { Language, RankInfo, TurnEmoji } from '../types/game';
import { TRANSLATIONS, formatCompactMoney } from '../i18n/translations';

export const TURN_EMOJI_CHAR: Record<TurnEmoji, string> = {
  green: '🟢',
  yellow: '🟡',
  red: '🔴',
};

export function formatEmojiTrail(
  emojis: TurnEmoji[],
  won: boolean,
  lost = false
): string {
  if (emojis.length === 0) return won ? '👑' : '💼';
  const chars = emojis.map((e) => TURN_EMOJI_CHAR[e]);
  if (won) chars.push('👑');
  else if (lost) chars.push('💥');

  const lines: string[] = [];
  for (let i = 0; i < chars.length; i += 8) {
    lines.push(chars.slice(i, i + 8).join(''));
  }
  return lines.join('\n');
}

export function getShareGameUrl(): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${window.location.pathname}`;
}

export type ShareOutcome = 'shared' | 'copied' | 'cancelled' | 'failed';

export interface SharePayload {
  title: string;
  text: string;
  url: string;
  imageFile?: File | null;
}

export async function executeShare(
  payload: SharePayload
): Promise<ShareOutcome> {
  const { title, text, url, imageFile } = payload;

  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      if (
        imageFile &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [imageFile] })
      ) {
        await navigator.share({
          title,
          text: `${text}\n${url}`,
          files: [imageFile],
        });
        return 'shared';
      }

      await navigator.share({
        title,
        text,
        url,
      });
      return 'shared';
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return 'cancelled';
      }
      // Fall through to clipboard fallback if share failed due to environment/permissions
    }
  }

  const fullText = `${text}\n${url}`.trim();
  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    try {
      await navigator.clipboard.writeText(fullText);
      return 'copied';
    } catch {
      // Fall through to legacy textarea copy
    }
  }

  if (typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = fullText;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (ok) return 'copied';
    } catch {
      // Ignore fallback errors
    }
  }

  return 'failed';
}

export function buildAchievementShareText(params: {
  lang: Language;
  money: number;
  day: number;
  rank: RankInfo;
  isVictory?: boolean;
  isDaily?: boolean;
  dateKey?: string;
  emojis?: TurnEmoji[];
}): { title: string; text: string } {
  const {
    lang,
    money,
    day,
    rank,
    isVictory = false,
    isDaily = false,
    dateKey = '',
    emojis = [],
  } = params;

  const t = TRANSLATIONS[lang];
  const compactMoney = formatCompactMoney(money, lang);
  const rankTitle = rank.content[lang].title;

  if (isDaily) {
    const trail = formatEmojiTrail(emojis, isVictory, !isVictory && emojis.length > 0);
    if (lang === 'ar') {
      return {
        title: `${t.brandTitle} — تحدي اليوم ${dateKey}`,
        text: `🗓️ تحدي اليوم (${dateKey}) — ${t.brandTitle}\n🏆 الرتبة: ${rankTitle} | 💰 ${compactMoney} | 📅 ${day} يوم\n${trail}\nهل تستطيع تحقيق رقم أفضل في تحدي اليوم؟ العب الآن:`,
      };
    }
    if (lang === 'fr') {
      return {
        title: `${t.brandTitle} — Défi du jour ${dateKey}`,
        text: `🗓️ Défi du jour (${dateKey}) — ${t.brandTitle}\n🏆 Rang : ${rankTitle} | 💰 ${compactMoney} | 📅 Jour ${day}\n${trail}\nSaurez-vous faire mieux aujourd'hui ? Jouez ici :`,
      };
    }
    return {
      title: `${t.brandTitle} — Daily Challenge ${dateKey}`,
      text: `🗓️ Daily Challenge (${dateKey}) — ${t.brandTitle}\n🏆 Rank: ${rankTitle} | 💰 ${compactMoney} | 📅 Day ${day}\n${trail}\nCan you beat today's seed? Play now:`,
    };
  }

  if (lang === 'ar') {
    return {
      title: t.brandTitle,
      text: `${isVictory ? '👑 وصلت لقمة البليونير!' : '🔥 تحدّي في لعبة ' + t.brandTitle}\nبدأت بـ 20 درهماً فقط ووصلت إلى 💰 ${compactMoney} (${rankTitle}) خلال ${day} يوم!\nهل تستطيع تحطيم رقمي القياسي؟ العب الآن:`,
    };
  }
  if (lang === 'fr') {
    return {
      title: t.brandTitle,
      text: `${isVictory ? '👑 Statut Milliardaire atteint !' : '🔥 Défi sur ' + t.brandTitle}\nParti de 20 MAD, j’ai atteint 💰 ${compactMoney} (${rankTitle}) en ${day} jours !\nCapable de battre mon record ? Jouez ici :`,
    };
  }
  return {
    title: t.brandTitle,
    text: `${isVictory ? '👑 Reached Billionaire status!' : '🔥 Challenge me in ' + t.brandTitle}\nStarted with 20 MAD and reached 💰 ${compactMoney} (${rankTitle}) in ${day} days!\nThink you can beat my run? Play now:`,
  };
}

export function buildInviteShareText(lang: Language): {
  title: string;
  text: string;
} {
  const t = TRANSLATIONS[lang];
  if (lang === 'ar') {
    return {
      title: t.brandTitle,
      text: '💰 هل تستطيع تحويل 20 درهماً إلى مليار درهم؟ جرّب لعبة «تحدي الـ 20 درهماً» الآن ونافسني!',
    };
  }
  if (lang === 'fr') {
    return {
      title: t.brandTitle,
      text: '💰 Pouvez-vous transformer 20 MAD en 1 milliard ? Testez « Défi 20 Dirhams » maintenant !',
    };
  }
  return {
    title: t.brandTitle,
    text: '💰 Can you turn 20 MAD into 1 Billion? Play the 20 Dirhams Challenge and test your business instincts!',
  };
}

export async function generateAchievementCardFile(params: {
  lang: Language;
  money: number;
  day: number;
  rank: RankInfo;
  isVictory?: boolean;
  isDaily?: boolean;
  dateKey?: string;
  emojis?: TurnEmoji[];
}): Promise<File | null> {
  if (typeof document === 'undefined') return null;

  const {
    lang,
    money,
    day,
    rank,
    isVictory = false,
    isDaily = false,
    dateKey = '',
    emojis = [],
  } = params;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const t = TRANSLATIONS[lang];
    const isRTL = lang === 'ar';

    // Warm Oasis Sand Background
    ctx.fillStyle = '#FBF6EC';
    ctx.fillRect(0, 0, 1080, 1080);

    // Outer Gold Frame
    ctx.strokeStyle = isVictory ? '#D49B2A' : '#145C43';
    ctx.lineWidth = 14;
    ctx.strokeRect(32, 32, 1016, 1016);

    // Top Emerald Header Banner
    const grad = ctx.createLinearGradient(0, 0, 1080, 320);
    grad.addColorStop(0, '#0D4431');
    grad.addColorStop(1, '#186B4E');
    ctx.fillStyle = grad;
    ctx.fillRect(46, 46, 988, 250);

    // Header Title & Kicker
    ctx.textAlign = 'center';
    ctx.fillStyle = '#F7CF73';
    ctx.font = 'bold 34px Cairo, Tajawal, sans-serif';
    const headerKicker = isDaily
      ? `${t.daily.badge} · ${dateKey}`
      : isVictory
      ? t.endScreen.victoryKicker
      : t.share.cardKicker;
    ctx.fillText(headerKicker, 540, 125);

    ctx.fillStyle = '#FFFDF8';
    ctx.font = '800 58px Cairo, Tajawal, sans-serif';
    ctx.fillText(t.brandTitle, 540, 215);

    // Gold Accent Divider
    ctx.fillStyle = '#D49B2A';
    ctx.fillRect(160, 292, 760, 8);

    // Rank Badge Pill Box
    ctx.fillStyle = '#FAF0DA';
    ctx.strokeStyle = '#DFCEB2';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(140, 345, 800, 150, 28);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#8A6234';
    ctx.font = 'bold 28px Cairo, Tajawal, sans-serif';
    ctx.fillText(rank.content[lang].stageName, 540, 400);

    ctx.fillStyle = '#145C43';
    ctx.font = '800 54px Cairo, Tajawal, sans-serif';
    ctx.fillText(rank.content[lang].title, 540, 465);

    // Wealth Stat Box
    ctx.fillStyle = '#FFFDF8';
    ctx.strokeStyle = '#D49B2A';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(140, 530, 800, 190, 28);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#7A624B';
    ctx.font = 'bold 30px Cairo, Tajawal, sans-serif';
    ctx.fillText(t.endScreen.finalBalance, 540, 588);

    ctx.fillStyle = '#1F150D';
    ctx.font = '800 68px Cairo, Tajawal, sans-serif';
    ctx.fillText(formatCompactMoney(money, lang), 540, 668);

    // Days / Emoji Summary
    ctx.fillStyle = '#5C4128';
    ctx.font = 'bold 34px Cairo, Tajawal, sans-serif';
    const daySummary = `${t.dayCount(day)} · 20 → 1B MAD`;
    ctx.fillText(daySummary, 540, 785);

    if (isDaily && emojis.length > 0) {
      const trailLine = emojis
        .slice(0, 12)
        .map((e) => TURN_EMOJI_CHAR[e])
        .join(' ');
      ctx.font = '38px sans-serif';
      ctx.fillText(trailLine, 540, 865);
    }

    // Call to Action Footer
    ctx.fillStyle = '#145C43';
    ctx.beginPath();
    ctx.roundRect(180, 915, 720, 82, 22);
    ctx.fill();

    ctx.fillStyle = '#FFFDF8';
    ctx.font = '800 34px Cairo, Tajawal, sans-serif';
    ctx.direction = isRTL ? 'rtl' : 'ltr';
    ctx.fillText(t.share.challengeCta, 540, 968);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/png')
    );
    if (!blob) return null;
    return new File([blob], '20-dirhams-achievement.png', {
      type: 'image/png',
    });
  } catch {
    return null;
  }
}
