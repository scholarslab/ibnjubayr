Clone of the original ibnjubayr.lib.virginia.edu. This is replicated within a
Docker container.

# Steps for reproducing:

- Download all the files from the original.
- Make a copy of the original database.
  - modify the database
- Build the container using the downloaded files and the original database.


# Changes to database file
- made all existing users contributors and inactive
- made the baselayer for all exhibits Open Street Maps because Google Maps
  needs an API key to work.
