```JavaScript
function lcs(word1, word2) {
  const len_1 = word1.length;
  const len_2 = word2.length;
  let max = 0;
  const lcsArr = Array.from({ length: len_1 }, () => (Array.from({ length: len_2 }, () => 0)));
  for (let i = 0; i < len_2; i++) {
    for (let j = 0; j < len_1; j++) {
      if (word2[i] == word1[j] && i != 0 && j != 0) {
        lcsArr[j][i] = lcsArr[j - 1][i - 1] + 1;
        max = Math.max(max, lcsArr[j][i]);
      }
    }
  }
  console.log({lcsArr})
  return max;
}
```
## 开发难点及注意事项

1.2	开发难点及注意事项
啦啦中的 Scratch3是结合啦啦的现有业务在开源项目上进行二次开发的项目。
开发难点如下：

1.	Scratch3 开源项目由官方团队维护，可参考文档无，对项目的熟悉仅能通过阅读项目代码。阅读源码，熟悉项目，也是该项目中占用时间较大的一方面。

2.	Scratch3 的技术栈为 React + Redux + webpack 等，采用组件化方式开发，组件繁多，嵌套颇深，状态管理复杂，结合啦啦业务时有难度。

3.	官方开源项目提交依然很活跃，需要实时或不定期地同步到啦啦项目中。为避免开源项目与啦啦业务的冲突，应减少代码的侵入性，需要有好的模式。另外需要git 的版控方案。

4.	在结合啦啦业务时，可能需要重新设计后台 API。

5.	Scratch3 项目属于啦啦项目的子项目，啦啦官网也需与 Scratch3项目保持一致（此开发时间未列入 Scratch3 开发时间中）。

6.	Scratch3 构建部署环境单一，需要重新搭建一套集测试、预发布和生产的构建部署环境（此开发时间未列入 Scratch3 开发时间中）。

7.	由于Scratch3 为 GitHub 上的开源项目，考虑到国内的网络情况，可能需要 npm 私库支持。

自己方案：
1.	减少组件的直接修改，采用高阶组件或添加中间层等方式隔离业务和源代码，如此会增加额外的工作量，且后续的维护更新频率也取决于耦合程度。
e.g. ：
登录功能：LoginDropdown 依赖的组件和被依赖的组件发生更改都会影响到 LoginDropdown，直接修改 LoginDropdown，会导致后期同步更新时多种冲突。
2.	 git采用多分支管理，分别 Scratch3 官方源码、测试分支、预发布分支、生产分支、开发分支，定期同步 Scratch3 官方源码。


就以上问题，为了后期更好地维护，开发时需要给出可行方案。¬¬¬¬


google-analytics 谷歌分析，Request Blocking