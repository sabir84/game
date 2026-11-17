export type AdRewardType = 'SECOND_CHANCE' | 'DOUBLE_DAILY_PROFIT';

export interface AdRewardResult {
  rewarded: boolean;
  type: AdRewardType;
}

/**
 * دالة تشغيل إعلان المكافأة (Rewarded Ad) لدمج Google AdMob عند التصدير إلى Android (AAB).
 */
export async function showRewardedAd(
  rewardType: AdRewardType,
  runWebSimulation?: () => Promise<boolean>
): Promise<AdRewardResult> {
  // TODO: AdMob Rewarded Ad Code
  // عند التحويل إلى تطبيق أندرويد (عبر Capacitor أو Android Bridge)، استبدل المحاكاة بالكود التالي:
  // 1. إذا كنت تستخدم Capacitor AdMob (@capacitor-community/admob):
  //    await AdMob.prepareRewardVideoAd({ adId: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY' });
  //    const rewardItem = await AdMob.showRewardVideoAd();
  //    if (rewardItem) return { rewarded: true, type: rewardType };
  //
  // 2. أو إذا كنت تستخدم جسر JavaScript داخل Android WebView:
  //    if ((window as any).AndroidAdMob?.showRewardedAd) {
  //      (window as any).AndroidAdMob.showRewardedAd(rewardType);
  //    }

  if (runWebSimulation) {
    const completed = await runWebSimulation();
    return { rewarded: completed, type: rewardType };
  }

  return { rewarded: true, type: rewardType };
}
