var chai = require('chai');

var assert = chai.assert;

var chaiHttp = require('chai-http');

var request = require('superagent');

var expect = require('expect.js');

var expected, current;

chai.use(chaiHttp);


describe('Array', function() {

/*- a list of programme titles and images
- the ability to paginate if the letter has more than 20 results
- navigation to other letters*/


  it('should return http respone code 200  - written to fail', function(done) {

  		chai.request('{base_uri}/ibl/v1/atoz/{letter}/programmes?page={page}').get('/').end(function(err, res){


              assert.equal(res.status,200);

            
      			done();


         });


 });



  it('should return http respone code 200 - written to pass', function(done) {


        var base_uri = 'https://ibl.api.bbci.co.uk';

        var letter = 'a'; 

        var page = '1';

  
        chai.request(base_uri).get('/ibl/v1/atoz/'+letter+'/programmes?page='+page).end(function(err, res){

      
              assert.equal(res.status,200);

      			done();


         });


 });

it('should return array of programme titles and images - written to fail', function(done) {


        var base_uri = 'https://ibl.api.bbci.co.uk';

        var letter ; 

        var page ;

        chai.request(base_uri).get('/ibl/v1/atoz/'+letter+'/programmes?page='+page).end(function(err, res){

              //assert.equal(res.status,200,res.body.error.details);

              assert(Array.isArray(res.body),res.body.error.details);
      		  
      		  done();


         });


 });


it('should return array of programme titles and images  - written to pass', function(done) {


        var base_uri = 'https://ibl.api.bbci.co.uk';

        var letter = 'a'; 

        var page ='1';

        chai.request(base_uri).get('/ibl/v1/atoz/'+letter+'/programmes?page='+page).end(function(err, res){


              //console.log(res.body);
              
              assert(Array.isArray(res.body.atoz_programmes.elements),"body is  an array");

              done();


         });


 });

it('should return array of programme titles and images greater than 1 - written to fail', function(done) {


        var base_uri = 'https://ibl.api.bbci.co.uk';

        var letter = 'a'; 

        var page ='1';

        chai.request(base_uri).get('/ibl/v1/atoz/'+letter+'/programmes?page='+page).end(function(err, res){


              //console.log(res.body);
              
              assert(Array.isArray(res.body),"body is not an array");

              done();


         });


 });

it('should return array of programme titles and images greater than 1 - written to pass', function(done) {


        var base_uri = 'https://ibl.api.bbci.co.uk';

        var letter = 'a'; 

        var page ='1';

        chai.request(base_uri).get('/ibl/v1/atoz/'+letter+'/programmes?page='+page).end(function(err, res){

              //console.log(res.body);
              
              assert.isAbove(res.body.atoz_programmes.elements.length , 1, 'array of programme titles and images should be above 1');

              done();

         });


 });


it('should return more than 1 pages if letter has more than 20 - written to fail', function(done) {


        var base_uri = 'https://ibl.api.bbci.co.uk';

        var letter = 'a'; 

        var page ='1';

        var num_of_pages ;

        chai.request(base_uri).get('/ibl/v1/atoz/'+letter+'/programmes?page='+page).end(function(err, res){

              //console.log(res.body);
              
              if(res.body.atoz_programmes.count > 20 )

              {

                 
                 assert.isAbove(num_of_pages,1,'number of pages returned for a specified letter');


              }
              
              else
              
              {



                 assert.equal(num_of_pages,1,'number of pages returned for a specified letter');


              }

              
              done();

         

         });


 });


it('should return more than 1 pages if letter has more than 20 - written to pass', function(done) {


        var base_uri = 'https://ibl.api.bbci.co.uk';

        var letter = 'a'; 

        var page ='1';

        var num_of_pages ;

        chai.request(base_uri).get('/ibl/v1/atoz/'+letter+'/programmes?page='+page).end(function(err, res){

              //console.log(res.body);
              
              num_of_pages = Math.round(Number(res.body.atoz_programmes.count) / 20 );

              if(res.body.atoz_programmes.count > 20 )

              {

                 
                 assert.isAbove(num_of_pages,1,'number of pages returned for a specified letter');


              }
              
              else
              
              {



                 assert.equal(num_of_pages,1,'number of pages returned for a specified letter');


              }

              
              done();

         

         });


 });



});

