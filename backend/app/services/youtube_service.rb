class YoutubeService
  include HTTParty
  BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

  def initialize
    @api_key = ENV['YOUTUBE_API_KEY'].freeze
  end

  def search_videos
    response = HTTParty.get(BASE_URL, {
      query: {
        part: 'snippet',
        q: 'curso de programação',
        key: @api_key,
        type: 'video',
        maxResults: 10
      }
    })

    JSON.parse(response.body)
  rescue HTTParty::Error => e
    Rails.logger.error("HTTParty error: #{e}")
  end
end
