# Booking Widget Implementation

## Overview
The BookMyGarage booking widget has been successfully integrated into your website. The widget allows customers to book services online 24/7 with zero commission fees.

## Implementation Details

### Component Created
- **File**: `src/components/booking-widget.tsx`
- **Purpose**: Reusable booking widget component that embeds the BookMyGarage iframe
- **Features**:
  - Responsive design that works on all screen sizes
  - Elegant styling with rounded corners and shadows
  - Optional title and subtitle
  - Smooth reveal animation on page load
  - Accessibility-compliant with proper iframe title

### Pages Updated
The booking widget has been prominently displayed on all key pages:

1. **Home Page** (`src/routes/index.tsx`)
   - Located right after the Hero section
   - Positioned at the top for maximum visibility
   - Full title and description included

2. **Contact Page** (`src/routes/contact.tsx`)
   - Placed after the page header
   - Before the contact form
   - Allows visitors to book directly instead of sending a message

3. **Services Page** (`src/routes/services.tsx`)
   - Displayed after the service category tabs
   - Before the service grid
   - Encourages immediate booking after viewing services

4. **About Page** (`src/routes/about.tsx`)
   - Located after the team section
   - Before the final CTA section
   - Provides booking option for interested visitors

## Widget Configuration

### Embed Code
```html
<iframe 
  src="https://bookmygarage.com/widget/96241fc81af444c3ac393bb18a3acd48/" 
  style="overflow:hidden;border:none;margin:0;min-height: 214px;width:100%"
  title="Book My Garage - Online Booking Widget"
  loading="lazy"
/>
```

### Widget ID
Your unique widget ID: `96241fc81af444c3ac393bb18a3acd48`

## Styling Features
- **Rounded corners** (3xl border radius) for modern appearance
- **Shadow effects** (elegant shadow) for depth
- **Border ring** with subtle transparency
- **Responsive width** (100% of container)
- **Minimum height** (214px as specified by BookMyGarage)
- **Lazy loading** for better performance

## Customization Options

If you want to customize the widget appearance or placement:

### Change Title/Subtitle
Edit `src/components/booking-widget.tsx`:
```tsx
<h2>Your Custom Title</h2>
<p>Your custom description</p>
```

### Hide Title on Specific Pages
Pass `showTitle={false}` when using the component:
```tsx
<BookingWidget showTitle={false} />
```

### Adjust Spacing
Modify the `className` prop:
```tsx
<BookingWidget className="my-custom-spacing" />
```

### Remove from a Page
Simply remove or comment out the booking widget section in the specific page file.

## Benefits
✅ **24/7 Availability** - Customers can book anytime
✅ **Zero Commission** - All bookings are commission-free
✅ **Increased Conversions** - Direct booking reduces friction
✅ **Professional Appearance** - Seamlessly integrated into your design
✅ **Mobile Responsive** - Works perfectly on all devices

## Testing
The widget has been tested and verified during the build process. The application builds successfully without errors.

To test the widget locally:
```bash
npm run dev
```

Then visit:
- http://localhost:3000/ (Home page)
- http://localhost:3000/contact
- http://localhost:3000/services
- http://localhost:3000/about

## Support
If you need to modify the widget URL or configuration, contact BookMyGarage support or update the iframe `src` in `src/components/booking-widget.tsx`.

## Badge Integration
You may also want to add the CarGarages partner badge to your website:
- Badge URL: `https://www.cargarages.co.uk/badges/cargarages-partner-badge.png`
- This can be added to the footer or about page to showcase your partnership

---

**Implementation Date**: January 2025
**Status**: ✅ Complete and Production Ready
