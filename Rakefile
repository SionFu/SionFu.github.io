task :default => :new

require 'fileutils'

desc "创建新 post"
task :new do
  puts "请输入要创建的 post URL：>>例如: Git-basic-commad"
	@url = STDIN.gets.chomp
	puts "请输入 post 标题：>>例如: 基础 Git 命令"
	@name = STDIN.gets.chomp
	puts "请输入 post 子标题：>>例如: 入门的 Git 相关命令"
	@subtitle = STDIN.gets.chomp
	puts "请输入 post 分类，以空格分隔：>>例如: fdson update"
	@categories = STDIN.gets.chomp
	puts "请输入 post 标签：>>例如: 学习 Git 经历"
	@tag = STDIN.gets.chomp
	@slug = "#{@url}"
	@slug = @slug.downcase.strip.gsub(' ', '-')
	@date = Time.now.strftime("%F")
	@post_name = "_posts/#{@date}-#{@slug}.md"
	if File.exist?(@post_name)
			abort("居然输入了和以前一模一样的标题,你神了!")
	end
	FileUtils.touch(@post_name)
	open(@post_name, 'a') do |file|
			file.puts "---"
			file.puts "layout: post"
			file.puts "title: #{@name}"
			file.puts "subtitle: #{@subtitle}"
			file.puts "author: Fu_sion"
			file.puts "date: #{Time.now}"
			file.puts "categories: #{@categories}"
			file.puts "tag: #{@tag}"
			file.puts "---"
	end
	exec "echo ' 打开_post 开始写吧>>#{@name}<<'"
end