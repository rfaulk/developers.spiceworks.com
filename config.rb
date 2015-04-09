require 'pry'

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

page "/documentation/plugins/*", layout: :plugins

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
  set :debug_assets, true
end

# Methods defined in the helpers block are available in templates
helpers do
  def current_guide
    return @current_guide if @current_guide

    path = current_page.path.gsub('.html', '')
    guide_path = path.split("/")[-1]

    @current_guide = data.plugin_guides.guides.find do |guide|
      guide.url == guide_path
    end
  end

  def page_title
    current_guide.title
  end

  def sidebar_for(guide_list)
    buffer = "<div class='aside-wrapper'><aside><nav class='sidebar'>"
    buffer << "<h4>#{guide_list.title}</h4>"
    buffer << "<ul classs='nav' role='tablist'>"

    guide_list.guides.each do |guide|
      current = (guide.url == current_guide.url)
      middleman_url = "#{guide_list.root}/#{guide.url}.html"

      buffer << "<hr />" if guide.new_section
      buffer << "<li class='#{'active' if current}'>"
        buffer << link_to(guide.title, middleman_url)

        if guide.sections
          buffer << "<nav class='submenu'><ul class='nav'>"
          guide.sections.each do |section|
            buffer << "<li>"
            buffer << link_to(section.title, section.url || "##{section.title.parameterize}")
            buffer << "</li>"
          end
          buffer << "</ul></nav>"
        end

      buffer << "</li>"
    end

    buffer << "</ul></nav></aside></div>"
    buffer
  end
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
