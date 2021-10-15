## Added & changed

- Moved logout button to main menu
- Implemented changing online status when tab/window gains or loses focus
- Show online badges in chat list
- Allow resizing chat list
- Changed to a new service worker (responsible for offline usage handling)
- Scroll to top button for chat list
- Click on an already-open chat folder to scroll to top
- New night mode toggle in main menu
- Add dummy buttons to main menu
- Dialogs opened from the main menu have a special animation
- Clicking outside a modal dialog will close it
- Cache small files (under 500KiB) in RAM
- Implemented more message types for chat last message
- Show thumbnails for some message types in chat list
- Improved security by always using password field when entering 2FA password
- Login: Phone number and verification code fields use number inputs
- Disabled secret chats (because Telegram Desktop doesn't have them)

## Bugfixes

- Chat last message overflow (`...`) is no longer ugly
- Context menus used to go out of window bounds
- Correctly state whether a chat list is empty or being loaded
- Login error labels should not randomly disappear anymore

## Known issues

- Firefox: Ripple effect works on first click, but subsequent clicks will result in the ripple coming from the top right corner, no matter where it is clicked

## Internal

- Made code clearer and added a lot of comment & JSDoc
- Included Tdweb JSON API type definitions
- Refactored archived chats slide animation to allow it to be used in other places
- `ConfirmDialog` inherits `Dialog`
- Alphabetically reorder icons in `icons.js`
