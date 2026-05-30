from PIL import Image
import numpy as np

def map_pixel_color(input_path, output_path, target_rgb, new_rgb):
    """
    Maps a specific RGB color to a new RGB color in a PNG image,
    leaving the Alpha (transparency) channel completely untouched.
    """
    # 1. Open the image and force conversion to RGBA to ensure it has an alpha channel
    img = Image.open(input_path).convert('RGBA')

    # 2. Convert the image data into a NumPy array for fast, vector-based manipulation
    data = np.array(img)

    # 3. Extract the Red, Green, and Blue channels (ignoring Alpha at index 3)
    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]

    # 4. Create a boolean mask that finds exactly where our target color exists
    mask = (r == target_rgb[0]) & (g == target_rgb[1]) & (b == target_rgb[2])

    # 5. Apply the new color to all pixels that match the mask.
    # The slice [:, :, :3] ensures we only overwrite R, G, and B, leaving Alpha alone.
    data[:, :, :3][mask] = new_rgb

    # 6. Convert the NumPy array back into a Pillow Image object
    new_img = Image.fromarray(data)

    # 7. Save the modified image
    new_img.save(output_path)
    print(f"Successfully saved modified image to {output_path}")

if __name__ == "__main__":
    # Define your file paths
    INPUT_FILE = "rings-clean-white.png"    # Replace with your actual input file name
    OUTPUT_FILE = "rings-clean-cream.png"  # Replace with your desired output file name

    # Define the colors
    OLD_COLOR = (255, 255, 255)
    NEW_COLOR = (240, 234, 214)

    # Run the function
    map_pixel_color(INPUT_FILE, OUTPUT_FILE, OLD_COLOR, NEW_COLOR)
