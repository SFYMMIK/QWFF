import subprocess
import os

def is_valid_url(url):
    result = subprocess.run(['./url_validation', url], capture_output=True, text=True)
    return result.returncode == 0

def get_valid_directory():
    while True:
        directory = input('Please enter the directory to save files: ')
        if os.path.isdir(directory):
            return directory
        else:
            print('Invalid directory. Please try again.')

def main():
    while True:
        url = input('Please enter the website URL (starting with http:// or https://): ')
        if not is_valid_url(url):
            print('Invalid URL. Please try again.')
            continue
        
        directory = get_valid_directory()
        
        # Call the Node.js script to fetch and save files
        try:
            result = subprocess.run(['node', 'fetch_files.js', url, directory], capture_output=True, text=True)
            print(result.stdout)
            print(result.stderr)
        except Exception as e:
            print(f'Failed to execute Node.js script: {e}')
            continue

        while True:
            again = input('Do you want to use the program again? (y/n): ').strip().lower()
            if again in ['y', 'n']:
                break
            print('Invalid input. Please enter "y" for yes or "n" for no.')
        
        if again == 'n':
            print('Quitting...')
            break

if __name__ == '__main__':
    main()
