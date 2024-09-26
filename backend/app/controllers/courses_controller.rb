
class CoursesController < ApplicationController

  def index
    @courses = ::Course.all
    render json: @courses, status: :ok
  end

  def create
    ::Course.new(course_params).call
      .on_success { |course| render json: course, status: :created }
  end

  def update
    ::Course.find(params[:id])
      .update_course(course_params)
      .on_success { |course| render json: course, status: :ok }
  end

  def destroy
    ::Course.find(params[:id]).destroy

    render json: { message: 'Course deleted' }, status: :ok
  end

  private

  def course_params
    params.require(:course).permit(:title, :description, :start_date, :end_date)
  end
end
