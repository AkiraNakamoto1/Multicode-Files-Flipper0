def generate_dip_switch_combinations():
    combinations = []
    for i in range(2**10):  # 10 bits means 2^10 combinations
        binary_string = f"{i:010b}"  # Format the number as a 10-bit binary string
        combinations.append(binary_string)
    return combinations

def create_flipper_subghz_files(combinations, base_file_data, output_directory):
    for combo in combinations:
        key_hex = f"{int(combo, 2):08X}"  # Convert binary string to 8-digit hexadecimal
        key_formatted = "00 00 00 00 00 00 " + " ".join([key_hex[i:i+2] for i in range(0, len(key_hex), 2)])
        file_name = f"{output_directory}/combo_{combo}.sub"
        
        with open(file_name, 'w') as file:
            for line in base_file_data:
                if 'Key: ' in line:
                    file.write(f"Key: {key_formatted}\n")
                else:
                    file.write(line)

# Sample base file data to replicate the structure
base_file_data = [
    "Filetype: Flipper SubGhz Key File\n",
    "Version: 1\n",
    "Frequency: 300000000\n",
    "Preset: FuriHalSubGhzPresetOok650Async\n",
    "Protocol: Linear\n",
    "Bit: 10\n"
    "Key: "
]

# Generate all possible combinations of dip switches
all_combinations = generate_dip_switch_combinations()

# Directory to save the generated files
output_directory = 'files'

# Ensure the output directory exists
import os
os.makedirs(output_directory, exist_ok=True)

# Create the sub-GHz files based on the generated combinations
create_flipper_subghz_files(all_combinations, base_file_data, output_directory)

output_directory