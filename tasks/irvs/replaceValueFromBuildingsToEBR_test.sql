--update  irvs.enhanced_building_risk as p1
 --Set replace_val_ogs = p2.replace_val
 --FROM irvs.buildings_2018_new as p2
  --where  p1.building_id = p2.id 
             -- and p2.replace_val is not null;

--insert into irvs.enhanced_building_risk (replace_val_ogs)
 --select  p2.replace_val as replace_val_ogs
 --FROM irvs.buildings_2018_new as p2
 --INNER JOIN irvs.enhanced_building_risk as p1 
 --  on p1.building_id = p2.id 
 --  where p2.replace_val is not null;

-- select p2.replace_val as replace_val_ogs,
--	 p2.id as id    
--	 FROM irvs.buildings_2018_new as p2 
--	 where p2.id = ANY( SELECT building_id from irvs.enhanced_building_risk) limit 10;
	 --and p2.replace_val is not null


 
 insert into irvs.enhanced_building_risk 
           (replace_val_ogs, id)
	 select p2.replace_val as replace_val_ogs,
	 p2.id as id    
	 FROM irvs.buildings_2018_new as p2 
	 where p2.id = ANY( SELECT building_id from irvs.enhanced_building_risk)
	 and p2.replace_val is not null
            



