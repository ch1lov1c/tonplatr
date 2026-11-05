/* ТонПлат: первая сторона, функциональный cookie для выбора хранения корзины. */
(function () {
  "use strict";
  const COOKIE_NAME = "tonplat_cookie_choice_v2";
  const LEGACY_PREF_KEY = "tonplat_storage_choice_v1";
  const CART_KEY = "tonplat_cart_v2";
  const COOKIE_AGE = 60 * 60 * 24 * 180; // 180 дней

  function storageGet(s, k) { try { return s.getItem(k); } catch (_) { return null; } }
  function storageSet(s, k, v) { try { s.setItem(k, v); } catch (_) {} }
  function storageRemove(s, k) { try { s.removeItem(k); } catch (_) {} }
  function cookiePath() {
    // Для GitHub Pages /dde/ не создаём cookie для других проектов /.../
    const pathname = window.location.pathname;
    return pathname.endsWith("/") ? pathname : pathname.slice(0, pathname.lastIndexOf("/") + 1) || "/";
  }
  function getPreference() {
    try {
      const m = document.cookie.match(/(?:^|;\s*)tonplat_cookie_choice_v2=(essential|persistent)(?:;|$)/);
      return m ? m[1] : null;
    } catch (_) { return null; }
  }
  function setPreference(pref) {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = COOKIE_NAME + "=" + pref + "; Max-Age=" + COOKIE_AGE + "; Path=" + cookiePath() + "; SameSite=Lax" + secure;
  }
  // Без нового выбора нельзя использовать старое постоянное хранилище.
  if (!getPreference()) storageRemove(localStorage, CART_KEY);
  storageRemove(localStorage, LEGACY_PREF_KEY);

  function getCart(key) {
    return storageGet(getPreference() === "persistent" ? localStorage : sessionStorage, key);
  }
  function saveCart(key, value) {
    const longTerm = getPreference() === "persistent";
    storageSet(longTerm ? localStorage : sessionStorage, key, value);
    storageRemove(longTerm ? sessionStorage : localStorage, key);
  }
  function selectPreference(persistent) {
    const oldChoice = getPreference();
    const oldCart = storageGet(oldChoice === "persistent" ? localStorage : sessionStorage, CART_KEY);
    setPreference(persistent ? "persistent" : "essential");
    if (oldCart !== null) saveCart(CART_KEY, oldCart);
    else if (!persistent) storageRemove(localStorage, CART_KEY);
    const banner = document.getElementById("privacy-banner");
    if (banner) banner.hidden = true;
    window.dispatchEvent(new Event("tonplat:privacy-choice"));
  }
  window.TONPLAT_PRIVACY = Object.freeze({ getCart, saveCart, getPreference, selectPreference });
  document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("privacy-banner");
    const settings = document.getElementById("privacy-settings-btn");
    const accept = document.getElementById("privacy-accept");
    const reject = document.getElementById("privacy-reject");
    if (banner) banner.hidden = Boolean(getPreference());
    if (settings) settings.addEventListener("click", function () {
      if (banner) { banner.hidden = false; banner.scrollIntoView({block: "nearest", behavior: "smooth"}); }
    });
    if (accept) accept.addEventListener("click", function () { selectPreference(true); });
    if (reject) reject.addEventListener("click", function () { selectPreference(false); });
  });
}());
