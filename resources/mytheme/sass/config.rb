# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework automatically.
load File.join(dir, '..', '..', '..', 'touch', 'resources', 'themes')

# Compass configurations
sass_path = dir

# Require any additional compass plugins here.
relative_assets = true

fonts_path = File.join(dir, "..", "fonts")
images_path = File.join(dir, "..", "images")
pictos_path = File.join(dir, "..", "icons")
css_path = File.join(dir, "..", "css")

#output settings
output_style = :compressed
environment = :production
