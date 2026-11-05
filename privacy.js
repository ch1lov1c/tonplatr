/* Сведения о выборе настроек и корзина, без аналитики, cookies, внешних запросов. */
(function () {
  "use strict";
  const PREF_KEY = "tonplat_storage_choice_v1";
  const CART_KEY = "tonplat_cart_v2";
  function storeRead(storage, key) {
    try { return storage.getItem(key); } catch (_) { return null; }
  }
  function storeWrite(storage, key, value) {
    try { storage.setItem(key, value); } catch (_) {}
  }
  function storeRemove(storage, key) {
    try { storage.removeItem(key); } catch (_) {}
  }
  function getPreference() {
    const value = storeRead(localStorage, PREF_KEY);
    return value === "persistent" || value === "session" ? value : null;
  }
  function getCart(key) {
    const pref = getPreference();
    // До явного выбора долговременное сохранение запрещено.
    return storeRead(pref === "persistent" ? localStorage : sessionStorage, key);
  }
  function saveCart(key, value) {
    const pref = getPreference();
    storeWrite(pref === "persistent" ? localStorage : sessionStorage, key, value);
    if (pref !== "persistent") storeRemove(localStorage, key);
    else storeRemove(sessionStorage, key);
  }
  function selectPreference(persistent) {
    const existing = storeRead(getPreference() === "persistent" ? localStorage : sessionStorage, CART_KEY);
    storeWrite(localStorage, PREF_KEY, persistent ? "persistent" : "session");
    if (existing !== null) saveCart(CART_KEY, existing);
    else if (!persistent) storeRemove(localStorage, CART_KEY);
    const banner = document.getElementById("privacy-banner");
    if (banner) banner.hidden = true;
    window.dispatchEvent(new Event("tonplat:privacy-choice"));
  }
  window.TONPLAT_PRIVACY = Object.freeze({getCart, saveCart, getPreference, selectPreference});
  document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("privacy-banner");
    const settings = document.getElementById("privacy-settings-btn");
    const accept = document.getElementById("privacy-accept");
    const reject = document.getElementById("privacy-reject");
    if (banner) banner.hidden = Boolean(getPreference());
    if (settings) settings.addEventListener("click", function () { if (banner) {banner.hidden = false; banner.scrollIntoView({block:"nearest",behavior:"smooth"});} });
    if (accept) accept.addEventListener("click", function () {selectPreference(true);});
    if (reject) reject.addEventListener("click", function () {selectPreference(false);});
  });
}());
