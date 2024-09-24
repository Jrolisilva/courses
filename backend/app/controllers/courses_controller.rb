
class CoursesController < ApplicationController
  def index
    render json: ::Course.all
  end

  def create
    ::Course.call(course_params)
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
    params.require(:course).permit(:title, :description)
  end
end
