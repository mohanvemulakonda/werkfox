# Cookie Consent Banner Implementation

## Overview
This is a comprehensive GDPR-compliant cookie consent banner implementation for the Livato Solutions website. The banner provides users with granular control over their cookie preferences while maintaining a professional design that matches the Livato brand.

## Features

### 1. Cookie Categories
- **Essential Cookies**: Required for website functionality (always enabled, non-toggleable)
- **Analytics Cookies**: Track visitor interactions and improve user experience
- **Marketing Cookies**: Personalized content and ad tracking
- **Preference Cookies**: Remember user settings and preferences

### 2. User Controls
- **Accept All**: Enables all cookie categories
- **Reject All**: Only enables essential cookies
- **Customize**: Opens detailed settings modal for granular control
- **Cookie Settings Button**: Persistent button to change preferences after initial consent

### 3. Design Highlights
- Matches Livato brand (blue theme: #427AFF primary, #2563EB hover states)
- Uses Inter font for body text and Open Sans for headings
- Smooth slide-up animation on mount
- Responsive design for mobile and desktop
- Professional modal overlay for detailed settings
- Toggle switches for easy preference management

### 4. Technical Implementation
- Built with React and TypeScript
- Uses Next.js 15 App Router architecture
- Client-side only (uses 'use client' directive)
- Stores preferences in localStorage
- Integrates with Google Analytics consent mode

## File Structure

```
/Users/mohanvemulakonda/projects/LivatoSolutions/
├── lib/
│   └── cookie-consent-context.tsx    # React context for managing consent state
├── components/
│   └── CookieBanner.tsx              # Main banner component with modal
├── app/
│   ├── layout.tsx                     # Updated to include CookieConsentProvider
│   └── globals.css                    # Updated with slide-up animation
```

## Usage

### Basic Usage (Already Integrated)
The cookie banner is automatically displayed on the website. No additional code is needed.

### Using the Hook in Components
If you need to check cookie preferences in your components:

```tsx
'use client';

import { useCookieConsent } from '../lib/cookie-consent-context';

export default function YourComponent() {
  const { preferences, hasConsent } = useCookieConsent();

  // Check if analytics are enabled
  if (preferences.analytics) {
    // Initialize analytics
  }

  // Check if marketing cookies are enabled
  if (preferences.marketing) {
    // Load marketing scripts
  }

  return <div>Your content</div>;
}
```

### Programmatic Control

```tsx
'use client';

import { useCookieConsent } from '../lib/cookie-consent-context';

export default function SettingsPage() {
  const { openSettings, acceptAll, rejectAll } = useCookieConsent();

  return (
    <div>
      <button onClick={openSettings}>Manage Cookie Preferences</button>
      <button onClick={acceptAll}>Accept All Cookies</button>
      <button onClick={rejectAll}>Reject All Cookies</button>
    </div>
  );
}
```

## Storage Keys

The implementation uses the following localStorage keys:
- `livato-cookie-consent`: Stores whether user has given consent (boolean)
- `livato-cookie-preferences`: Stores the detailed preferences object (JSON)

## Google Analytics Integration

The implementation includes basic Google Analytics consent mode integration. When a user accepts analytics cookies, it triggers:

```javascript
window.gtag('consent', 'update', {
  analytics_storage: 'granted',
});
```

Make sure your Analytics component properly initializes with consent mode denied by default.

## Privacy & Cookie Policy Links

The banner includes links to:
- `/privacy-policy` - Privacy Policy page
- `/cookie-policy` - Cookie Policy page

**Important**: Create these pages if they don't exist yet.

## Customization

### Changing Colors
The banner uses Tailwind classes. To customize colors:
- Primary blue: `bg-blue-600`, `text-blue-600`, `border-blue-600`
- Hover states: `hover:bg-blue-700`
- Update these classes in `/Users/mohanvemulakonda/projects/LivatoSolutions/components/CookieBanner.tsx`

### Adjusting Animation
Modify the animation in `/Users/mohanvemulakonda/projects/LivatoSolutions/app/globals.css`:

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Delay Before Showing Banner
Adjust the delay in `/Users/mohanvemulakonda/projects/LivatoSolutions/lib/cookie-consent-context.tsx`:

```tsx
setTimeout(() => setShowBanner(true), 1000); // Change 1000 to desired ms
```

## Testing

### Test First Visit
1. Clear localStorage: Open DevTools > Application > Local Storage > Delete all items
2. Refresh the page
3. Banner should slide up after 1 second
4. Test all three buttons: Accept All, Reject All, Customize

### Test Customization
1. Click "Customize" button
2. Toggle different cookie categories
3. Click "Save Preferences"
4. Refresh page - banner should not appear
5. Click "Cookie Settings" button in bottom-left
6. Verify saved preferences are displayed correctly

### Test Persistence
1. Make a selection (Accept All, Reject All, or Custom)
2. Close browser completely
3. Reopen website
4. Banner should not appear
5. "Cookie Settings" button should be visible

### Test Mobile Responsiveness
1. Open DevTools
2. Toggle device toolbar (Cmd+Shift+M on Mac)
3. Test on various screen sizes (iPhone, iPad, etc.)
4. Verify buttons stack vertically on mobile
5. Verify modal is scrollable and fits within viewport

## GDPR Compliance Notes

This implementation follows GDPR best practices:
- ✅ Explicit consent required before non-essential cookies
- ✅ Granular control over cookie categories
- ✅ Easy-to-access preference management
- ✅ Clear descriptions of what each category does
- ✅ Links to privacy and cookie policies
- ✅ Essential cookies clearly marked as required
- ✅ Preferences persist across sessions
- ✅ Users can change their mind anytime

## Browser Compatibility

Tested and compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses standard Web APIs:
- localStorage
- React hooks
- CSS animations

## Troubleshooting

### Banner doesn't appear
- Check browser console for errors
- Verify localStorage is enabled
- Clear localStorage and refresh

### Preferences not saving
- Check localStorage quota (should not be exceeded)
- Verify no browser extensions blocking localStorage

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check that globals.css animations are loaded
- Verify font classes are available

## Future Enhancements

Possible improvements:
1. Add cookie audit trail (track when consent was given/updated)
2. Implement cookie scanner to auto-detect third-party cookies
3. Add multi-language support
4. Create admin panel to manage cookie descriptions
5. Add consent banner A/B testing
6. Export consent records for compliance audits

## Support

For issues or questions about the cookie consent implementation:
1. Check this README first
2. Review the TypeScript files for inline documentation
3. Test in incognito/private mode to eliminate cache issues
4. Check browser DevTools console for errors

## License

This implementation is part of the Livato Solutions website codebase.
