SELECT ogc_fid, b.geoid as cousub_geoid, c.geoid as tract_geoid, objectid, county_name, muni_name, swis, parcel_add, 
       print_key, sbl, citytown_name, citytown_swis, loc_st_nbr, loc_street, 
       loc_unit, loc_zip, prop_class, roll_section, land_av, total_av, 
       full_market_val, yr_blt, front, depth, sq_ft, acres, school_code, school_name, 
       sewer_type, sewer_desc, water_supply, water_desc, utilities, utilities_desc, 
       bldg_style, bldg_style_desc, heat_type, heat_type_desc, fuel_type, fuel_type_desc, 
       sqft_living, nbr_kitchens, nbr_full_bath, nbr_bedrooms, used_as_code, used_as_desc, 
       ag_dist_code, ag_dist_name, primary_owner, mail_addr, po_box, mail_city, 
       mail_state, mail_zip, add_owner, add_mail_addr, add_mail_po_box, add_mail_city, 
       add_mail_state, add_mail_zip, book, page, grid_east, grid_north, muni_parcel_id, 
       swis_sbl_id, swis_print_key_id, roll_yr, spatial_yr, owner_type, nys_name, 
       nys_name_source, dup_geo, calc_acres, shape_leng, shape_area, wkb_geometry
  into parcel.parcel_2018_36_alb
  FROM public.nys_2017_tax_parcels_1811_valid_1 as a
  join geo.tl_2017_cousub as b 
    on ST_CONTAINS(ST_Transform(b.geom,4326), a.wkb_geometry)
        OR
        ( 
          st_intersects(
          b.geom,
          a.wkb_geometry
          )
          and
          (
            (
              st_area(
                st_intersection(
                 b.geom,
                 a.wkb_geometry
                )
              )
              /
              st_area(a.wkb_geometry)
          )
            > 
            0.5
          )
        )
  join geo.tl_2017_tract as c 
    on (
        ST_CONTAINS(ST_Transform(c.geom,4326), a.wkb_geometry)
        OR
        ( 
          st_intersects(
          c.geom,
          a.wkb_geometry
          )
          and
          (
            (
              st_area(
                st_intersection(
                 c.geom,
                 a.wkb_geometry
                )
              )
              /
              st_area(a.wkb_geometry)
          )
            > 
            0.5
          )
        )

      )

    WHERE a.muni_name = 'Albany'

    ;

