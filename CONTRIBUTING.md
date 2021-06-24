# Contributing guidelines

First of all, thanks for contributing to DIBgram!

## Reporting bugs

Found a bug in DIBgram? This section helps you report a bug and let the developer know about it.

1. Go to [the issues tab](https://github.com/dibgram/dibgram/issues)
2. Check if there is any existing issue reporting the same thing. If there isn't any, go to the next step.
3. At the top of the page, click on the green 'New issue' button  
   ![image](https://user-images.githubusercontent.com/67197540/123226698-22b9c300-d4e9-11eb-959b-a7a06fd3acc8.png)
4. Select the 'Bug report' template (click the 'Get started' button next to it)
   ![image](https://user-images.githubusercontent.com/67197540/123227181-95c33980-d4e9-11eb-8d6d-bec8ffc43e90.png)
5. Enter a title and fill in the template
   ![image](https://user-images.githubusercontent.com/67197540/123229104-3c5c0a00-d4eb-11eb-9612-9c94de7961a5.png)
   ![image](https://user-images.githubusercontent.com/67197540/123229308-69102180-d4eb-11eb-8447-7762209d1f71.png)

Please remain available after posting the issue, the developer/moderator may ask for further information.

### If there is already a report for the bug

- **When you have the same browser, OS and network as the original reporter**
  Then you can put a :+1: reaction on the issue (the reaction button is at the top of the box)
  ![image](https://user-images.githubusercontent.com/67197540/123230183-39154e00-d4ec-11eb-96f9-8766998dc343.png)
- **When your browser, OS or network are different than the original poster**
  Post a comment on the issue and specify your details.

  Example:

  ```md
  I am experiencing the same on Chrome 68 with Ubuntu 18.04
  ```

  You can also put a :+1: reaction on another comment which says the same.

## Requesting features

Found a feature missing from DIBgram? You can ask for it to be added!

Feature requests usually take a long time to be added, depending on how big it is.

Not all feature requests are accepted. The reasons for rejection include, but are not limited to:

1. It is not there in [the official Telegram Desktop app](https://desktop.telegram.org) (This defeats DIBgram's purpose, which is to be a web version of Telegram Desktop)
2. It is too much work for little benefit
3. It breaks Telegram's terms of service
4. It is impossible to do, because of limitations on Telegram API, web technologies or other things
5. It is not applicable for a web app

### Steps

Requesting a feature is very similar to [reporting a bug](#reporting-bugs), but you have to chose the 'Feature request' template at step 4

## Submitting a pull request

If you want to fix a bug or implement an accepted feature request yourself, you can fork DIBgram, do the modifications and pull request.

The contributions need to have the following qualities to be accepted:

- There should be no errors, warnings or notices from ESLint or StyleLint
- It should compile and run successfully
- It should not introduce a feature that is not present in the official Telegram Desktop app
- Behavior and UI should be similar to the official Telegram Desktop app
