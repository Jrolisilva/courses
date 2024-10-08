
Faker::Config.locale = 'pt-BR'

youtube_service = YoutubeService.new
videos = youtube_service.search_videos

videos['items'].each do |video|
  Course.create(
    title: video['snippet']['title'],
    description: video['snippet']['description'],
    start_date: video['snippet']['publishedAt'],
    end_date: Faker::Date.between(from: Date.today, to: 1.year.from_now).strftime('%d/%m/%Y')
  )
end
