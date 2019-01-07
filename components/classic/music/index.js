// components/classic/music/index.js
import classicBehavior from '../classic-behavior.js';

const backgroundAudioManager = wx.getBackgroundAudioManager();

Component({
  behaviors: [classicBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      observer: function (newVal, oldVal, changePath) {
        /**
         * 在这里触发比在在生命周期里触发会更完美
         * 生命周期里如果多个音乐类型的在一起排列时
         * 组件只是更新数据不会触发生命周期函数。
         */
        this._recoverPlaying();
        this._monitorSwitch();
      }
    },
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: 'images/player@play.png',
    pauseSrc: 'images/player@pause.png',
    playing: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePlayBtnTap() {
      if (!this.data.playing) {
        this.setData({
          playing: !this.data.playing
        });
        if (this.properties.src == backgroundAudioManager.src) {
          backgroundAudioManager.play();
        } else {
          backgroundAudioManager.src = this.properties.src;
        }
        backgroundAudioManager.title = this.properties.title;
      } else {
        this.setData({
          playing: !this.data.playing
        });
        backgroundAudioManager.pause();
      }
    },
    _recoverPlaying() {
      if (backgroundAudioManager.paused) {
        this.setData({
          playing: false
        });
      } else {
        if (this.properties.src == backgroundAudioManager.src) {
          if (!backgroundAudioManager.paused) {
            this.setData({
              playing: true
            });
          }
        } else {
          this.setData({
            playing: false
          });
        }
      }
    },
    _monitorSwitch() {
      backgroundAudioManager.onPlay(() => {
        this._recoverPlaying()
      });
      backgroundAudioManager.onPause(() => {
        this._recoverPlaying()
      });
      backgroundAudioManager.onStop(() => {
        this._recoverPlaying()
      });
      backgroundAudioManager.onEnded(() => {
        this._recoverPlaying()
      });
    }
  }
});
