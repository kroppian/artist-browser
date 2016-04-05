require 'rails_helper'

RSpec.describe ArtistsController, type: :controller do

  describe "GET #show" do
    it "returns http success" do
      get :show
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #index" do

    before do 
      get :index
    end

    context "If I get the home page" do

      it "returns http success" do

        expect(response).to have_http_status(:success)

      end # end -- returns http success
  
      it "serves a non empty Array" do
        
        expect(assigns(:periods).class).to eq(Array)
        expect(assigns(:periods).size).to_not eq(0)
        
      end # end -- serves a non empty Array
      
      it "serves an Array of period hashes with the right keys" do
       
        assigns(:periods).each do |period|

          expect(period.class).to eq(Hash)

          period_fields = {name: String, imgSrc: String, imgAlt: String, artists: Array, visible: FalseClass}
         
          period_fields.each_key do |current_period_field|

            expect(period).to have_key(current_period_field)
            expect(period[current_period_field].class).to eq(period_fields[current_period_field])

          end

        end

      end # end -- serves an Array of hashes

      it "serves an Array of hashes well formatted artists" do
       
        assigns(:periods).each do |period|

          expect(period.class).to eq(Hash)

          period_fields = {name: String, imgSrc: String, imgAlt: String, artists: Array, visible: FalseClass}
         
          period_fields.each_key do |current_period_field|

            expect(period).to have_key(current_period_field)
            expect(period[current_period_field].class).to eq(period_fields[current_period_field])

          end

        end

      end # end -- serves an Array of hashes


    end 

  end

end
