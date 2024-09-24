class Course < ApplicationRecord
  self.table_name = 'courses'

  validates :title, :description, :start_date, :end_date,  presence: true

  def call
    self.save
    self
  end

  def update_course(params)
    update(params)
    self
  end

  def on_success
   return yield(self) if persisted?

    on_failure
  end

  def on_failure
    add.errors(:base, 'Course not saved')

    yield(self)
  end
end
