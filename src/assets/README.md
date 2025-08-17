# Assets Folder

This folder contains static assets for the application.

## Structure

- `images/` - Image files (PNG, JPG, SVG, etc.)
- `descriptions/` - Asset description files (JSON, YAML, or text files containing metadata)
- `icons/` - Icon files
- `fonts/` - Font files (if needed)

## Usage

In Next.js, you can import images from this folder like:

```tsx
import myImage from '@/assets/images/my-image.png'
```

Or use them in CSS:

```css
background-image: url('@/assets/images/my-image.png');
```

## Asset Descriptions

The `descriptions/` folder contains metadata files for your assets. You can use these to:

- Store alt text for images
- Document asset usage and licensing
- Provide context for accessibility
- Track asset versions and sources

Example description file structure:
```json
{
  "filename": "hero-image.jpg",
  "alt": "Hero section background showing modern office space",
  "description": "Professional office environment with natural lighting",
  "usage": "Hero section background",
  "license": "Commercial use allowed",
  "source": "Stock photo library"
}
```

## Best Practices

- Use descriptive filenames
- Optimize images for web (compress PNG/JPG, use appropriate formats)
- Consider using Next.js Image component for better performance
- Keep file sizes reasonable for web use
- Maintain consistent description file formats
- Include alt text for accessibility
