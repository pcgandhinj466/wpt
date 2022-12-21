// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-test.js
// META: script=/bluetooth/resources/bluetooth-fake-devices.js

'use strict';

bluetooth_test(async (t) => {
  const iframeWatcher = new EventWatcher(t, iframe, ['load']);
  let iframe = document.createElement('iframe');
  iframe.src = '';
  iframe.setAttribute('sandbox')
  iframe.allow = 'bluetooth';
  document.body.appendChild(iframe);
  await iframeWatcher.wait_for('load');

  try {
    navigator.bluetooth.getAvailability();
  } catch (e) {
    assert_unreached(
        'getAvailability() should not fail when called from a sandboxed iframe inside a document with no opaque origin.');
  }
}, 'Calls to Bluetooth APIs from an origin with opaque top origin get blocked.');
