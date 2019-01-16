SELECT id, b.geoid as cousub_geoid, c.geoid as tract_geoid, objectid, county_nam, muni_name, swis, parcel_add, 
       print_key, sbl, citytown_n, citytown_s, loc_st_nbr, loc_street, 
       loc_unit, loc_zip, prop_class, roll_secti, land_av, total_av, 
       full_marke, yr_blt, front, depth, sq_ft, acres, school_cod, school_nam, 
       sewer_type, sewer_desc, water_supp, water_desc, utilities, utilities_, 
       bldg_style, bldg_sty_1, heat_type, heat_type_, fuel_type, fuel_type_, 
       sqft_livin, nbr_kitche, nbr_full_b, nbr_bedroo, used_as_co, used_as_de, 
       ag_dist_co, ag_dist_na, primary_ow, mail_addr, po_box, mail_city, 
       mail_state, mail_zip, add_owner, add_mail_a, add_mail_p, add_mail_c, 
       add_mail_s, add_mail_z, book, page, grid_east, grid_north, muni_parce, 
       swis_sbl_i, swis_print, roll_yr, spatial_yr, owner_type, nys_name, 
       nys_name_s, dup_geo, calc_acres, shape_leng, shape_area
  into parcel.parcel_2017_36_temp
  FROM public."nys_2017_tax_parcels_agencies_4326_WGS_84" as a
  join geo.tl_2017_cousub as b on ST_CONTAINS(ST_Transform(b.geom,4326), ST_MakeValid(a.geom))
  join geo.tl_2017_tract as c on ST_CONTAINS(ST_Transform(c.geom,4326), ST_MakeValid(a.geom));

