/*
 * 脚本负责处理专辑的交互逻辑：
 *  - 导航项点击时切换对应的章节展示
 *  - 在切换章节时暂停其他正在播放的音频/视频，避免同时播放
 */

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('#nav li');
  const parts = document.querySelectorAll('.part');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      // 激活当前导航项，取消其他项激活状态
      navItems.forEach(li => li.classList.remove('active'));
      item.classList.add('active');

      // 隐藏所有章节，并在切换时停止播放媒体
      parts.forEach(part => {
        // 暂停音频
        const audio = part.querySelector('audio');
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        // 暂停视频
        const video = part.querySelector('video');
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
        part.classList.remove('active');
      });

      // 显示目标章节
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
});