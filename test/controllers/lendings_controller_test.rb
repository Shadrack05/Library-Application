require "test_helper"

class LendingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_lendings_url
    assert_response :success
  end
end
