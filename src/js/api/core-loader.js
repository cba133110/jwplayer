import _ from 'utils/underscore';
import Events from 'utils/backbone.events';
import Model from 'controller/model';

let controllerPromise = null;

function loadController() {
    if (!controllerPromise) {
        controllerPromise = new Promise(function (resolve) {
            require.ensure(['controller/controller'], function (require) {
                const controller = require('controller/controller');
                resolve(controller);
            }, 'jwplayer.core');
        });
    }
    return controllerPromise;
}


const CoreLoader = function CoreSetup(originalContainer) {
    loadController();
    this._events = {};
    this._model = new Model();
    this.originalContainer = originalContainer;
    this.originalConfig = null;
};

/* eslint no-unused-vars: 0 */

_.extend(CoreLoader.prototype, Events, {
    setup(options) {
        this.originalConfig = options;
        return loadController();
    },
    playerDestroy() {
        // TODO: cancel async setup
        this._events =
            this._model =
            this.originalContainer =
            this.originalConfig = null;
    },
    getContainer() {
        return this.originalContainer;
    },

    // These methods read from the model
    get(property) {
        return this._model.get(property);
    },
    getItemQoe() {
        return this._model._qoeItem;
    },
    getConfig() {
        return this._model.getConfiguration();
    },
    getCurrentCaptions() {
        return this.get('captionsIndex');
    },
    getWidth() {
        return this.get('containerWidth');
    },
    getHeight() {
        return this.get('containerHeight');
    },
    getMute() {
        return this._model.getMute();
    },
    setMute(toggle) {
        this._model.setMute(toggle);
    },
    setVolume(value) {
        this._model.setVolume(value);
    },
    setPlaybackRate(value) {
        this._model.setPlaybackRate(value);
    },
    getProvider() {
        return this.get('provider');
    },
    getState() {
        // instream.model.state || model.state
        return this.get('state');
    },
    // Ads specific
    isBeforeComplete() {
        return false;
    },
    isBeforePlay() {
        return false;
    },
    createInstream() {
        return null;
    },
    skipAd() {},
    attachMedia() {},
    detachMedia() {
        return null; // video tag;
    },

    // These methods require a provider
    getAudioTracks() {
        return null;
    },
    getCaptionsList() {
        return null;
    },
    getQualityLevels() {
        return null;
    },
    getVisualQuality() {
        return null;
    },
    getCurrentQuality() {
        return -1;
    },
    getCurrentAudioTrack() {
        return -1;
    },
    castToggle() {},

    // Queue these
    setConfig(newConfig) {},
    setControls(toggle) {},
    setCurrentCaptions(index) {},
    setFullscreen(toggle) {},
    setCurrentQuality(index) {},
    setCurrentAudioTrack(index) {},
    load(item, feedData) {

    },
    play(meta = {}) {

    },
    pause(meta = {}) {

    },
    seek(pos, meta) {

    },
    stop(internal) {

    },
    playlistItem(index, meta) {

    },
    playlistPrev(meta) {

    },
    playlistNext(meta) {

    },
    next() {
        // nextUp or related.next();
    },
    addButton(img, tooltip, callback, id, btnClass) {},
    removeButton(id) {},

    // These are pass-throughs to the view
    setCaptions(captionsStyle) {
        // queue this for the view _captionsRenderer
    },
    resize(playerWidth, playerHeight) {
        // queue this for the view OR update model/config
    },
    setCues(cues) {
        // queue this for the view.addCues(cues) OR _model.set('cues', cues);
    },
    getSafeRegion() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }
});

export default CoreLoader;
