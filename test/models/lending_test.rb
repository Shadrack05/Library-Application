require "test_helper"

class LendingTest < ActiveSupport::TestCase
  test "should not save lending without name" do
    lending = Lending.new(borrowed_at: Time.now)
    assert_not lending.save, "Saved the lending without a borrower's name"
  end
end
