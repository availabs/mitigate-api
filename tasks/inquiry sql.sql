SELECT 
       damaged_property_city_name,
       damaged_property_county_or_parish_name as county,
       sum(total_verified_loss) as total_loss,
       sum(verified_loss_real_estate) as real_estate_loss, 
       sum(verified_loss_content) as content_loss,
       sum(total_approved_loan_amount) as total_sba_loan,
       sum(case when loan_type = 'home' then total_verified_loss else 0 end) as total_residential_loss,
       sum(case when loan_type = 'home' then verified_loss_real_estate else 0 end) as residential_real_estate_loss, 
       sum(case when loan_type = 'home' then verified_loss_content else 0 end) as residential_content_loss,
       sum(case when loan_type = 'home' then total_approved_loan_amount else 0 end) as total_sba_residential_loan,
       sum(case when loan_type = 'business' then total_verified_loss else 0 end) as total_business_loss,
       sum(case when loan_type = 'business' then verified_loss_real_estate else 0 end) as business_real_estate_loss, 
       sum(case when loan_type = 'business' then verified_loss_content else 0 end) as business_content_loss,
       sum(case when loan_type = 'business' then total_approved_loan_amount else 0 end) as total_sba_business_loan
       
       
       
       FROM public.sba_disaster_loan_data 
  where 
  fema_disaster_number = '4085'
  and damaged_property_state_code = 'NY'
  group by damaged_property_city_name,  damaged_property_county_or_parish_name
  order by total_loss desc