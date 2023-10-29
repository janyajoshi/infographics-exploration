from PIL import Image, ImageDraw, ImageFont

# Load the image
image = Image.open("initial-image.jpg")

# Create a drawing context
draw = ImageDraw.Draw(image)

# Define the key points (positions and text)
key_points = [(100, 100, "Text-1", "icon-1.png"), (200, 100, "Text-2", "icon-1.png"), (300, 100, "Text-3", "icon-1.png")]

# Define the font for text
font = ImageFont.load_default(size=24)

# Define the desired icon height
icon_height = 50  # Adjust this value as needed

# Overlay the key points
for (x, y, text, icon_path) in key_points:
    # Load and paste the icon onto the image
    icon = Image.open(icon_path)

    # Resize the icon to the desired height
    icon = icon.resize((int(icon.width * (icon_height / icon.height)), icon_height))

    image.paste(icon, (x, y), icon)

    draw.text((x, y + icon.height), text, fill="white", font=font)

# Save the result
image.save("final_image.jpg")
