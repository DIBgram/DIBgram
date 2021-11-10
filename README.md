<div align="center">
  <img src="https://avatars.githubusercontent.com/u/85128397?s=200&v=4" alt="DIBgram logo">
  <h1>DIBgram</h1>
  DIBgram is an unofficial Telegram <em>web</em> app which looks like Telegram Desktop.
</div>
&nbsp;

[![Progress: 12%](https://img.shields.io/badge/Progress-12%25-orange)](https://github.com/DIBgram/DIBgram/projects?query=is%3Aopen+sort%3Aname-asc )
[![Crowdin](https://badges.crowdin.net/dibgram/localized.svg)](https://crowdin.com/project/dibgram)
[![Licence: GPL v3.0](https://img.shields.io/github/license/DIBgram/DIBgram)](LICENCE)

*DIBgram is still in progress. Visit the [projects](https://github.com/DIBgram/DIBgram/projects?query=is%3Aopen+sort%3Aname-asc) section to see the current progress, or join our [Telegram channel](https://t.me/DIBgram) to keep track.*

## Usage

You can open the stable release of DIBgram at <https://DIBgram.github.io>, or the commitly(?) build at <https://DIBgram.github.io/beta>.

You can also build DIBgram yourself, as described [here](BUILDING.md).

## Differences with Telegram Desktop

### Advantages

- Does not need to be installed
- Works on any desktop platform with a decent browser (mobile is also supported but not optimized for it)
- Uses TDLib, which doesn't have so many problems with server<->client sync
- Interface can be zoomed as much as the browser allows without quality loss (about 25%-500% instead of 100%-300%)
- Caches messages locally, reducing bandwidth usage
- Does not limit accounts to 3

### Disadvantages

- Is not native, so it will be slower
- Some animations might be missing
- Does not support proxies (system proxy does work)
- It is less integrated with the operating system
- Probably won't support streaming

## Why make it

Many people like the official Telegram Desktop. But there are users who prefer to use Telegram on their browsers because of either security, work conditions or something else.

Also, most web versions either look bad or have missing features ([Webk][] and [Webz][] are better though)

[Webk]: https://webk.telegram.org
[Webz]: https://webz.telegram.org

I am developing this app so there is a web version that not only has most features and looks good, but also looks familiar to those who use Telegram Desktop.

Also, I will earn a lot of knowledge and experience while developing this app, because it is my first React project (I'm serious) and it is several orders of magnitude larger than my other past projects.

## Technologies, libraries and other software used in this project

- **[Telegram Desktop][]**: The basis of the design and look of DIBgram
- **[TdLib][]**: Telegram Database Library. Takes care of networking, encryption and storage
- **[React][]**: UI framework used in project
- **[Open Sans][] and [Vazir][] fonts**: Font families used in Telegram Desktop and DIBgram
- **[Sass][]**: CSS preprocessor
- **[ESLint][]**: Used to detect problems, warnings and enforce code style
- **[VSCode][]**: The IDE (or code editor) I use to develop the app. Also recommended for contributors

[Telegram Desktop]: https://github.com/telegramdesktop/tdesktop
[Open Sans]: https://github.com/googlefonts/opensans
[Vazir]: https://github.com/rastikerdar/vazir-font
[TdLib]: https://github.com/tdlib/td
[React]: https://github.com/facebook/react
[ESLint]: https://github.com/eslint/eslint
[VSCode]: https://github.com/microsoft/vscode
[Sass]: https://github.com/sass/sass
