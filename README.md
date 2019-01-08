Clone of the original http://ibnjubayr.lib.virginia.edu. This is replicated within a
Docker container.

# Steps for reproducing:

- Download all the files from the original.
- Make a copy of the original database.
  - modify the database as noted below
- Build the container using the downloaded files and the modified database.


# Changes to database file
- made all existing users contributors and inactive
- scrub the pass hash and salt for all users
- made the baselayer for all exhibits Open Street Maps because Google Maps
  needs an API key to work.
