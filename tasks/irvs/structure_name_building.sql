Update irvs.buildings_2018_new  as p1
set name = p2.name
FROM public.nys_structure_points as p2
where ST_Contains(p1.footprint, p2.geom)
and p1.name is null


-- select count(1)
-- FROM irvs.buildings_2018_new  as p1,
--     public.nys_structure_points as p2
-- where ST_Contains(p1.footprint, p2.geom)
-- and p1.name is null					