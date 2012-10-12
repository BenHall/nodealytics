var NA = require("../lib/main.js");
var should = require("should");

describe('initialize', function () {
  it('should require an account ID', function (done) {
    NA.initialize('', '', function (err, resp) {
      err.message.should.eql('Account ID is invalid');
      done();
    });
  });

  it('should require a domain', function (done) {
    NA.initialize('UA-12345678-1', '', function (err, resp) {
      err.message.should.eql('Domain is invalid');
      done();
    });
  });

  it('should initialize with the appropriate parameters', function (done) {
    NA.initialize('UA-33709401-1', 'testsite.com', done);
  });

  it('should initialize without optional callback', function (done){
    var evt = NA.initialize('UA-33709401-1', 'testsite.com');
    should.exist(evt);
    done();
  });
});

describe('page views', function () {
  it('should register a page view with callback', function (done){
    NA.trackPage('some title', 'some page', function (err, resp) {
      resp.statusCode.should.eql(200);
      done();
    });
  });

  it('should register a page view with events emitted', function (done){
    var evt = NA.trackPage('some title', 'some page');

    evt.on('viewed', function(err, resp) {
      resp.statusCode.should.eql(200);
      done();
    });
  });

});

describe('events', function() {
  it('should register an event with callback', function (done) {
    NA.trackEvent('test event', 'boom', function (err, resp) {
      resp.statusCode.should.eql(200);
      done();
    });
  });

  it('should register an event with events emitted', function (done) {
    var evt = NA.trackEvent('test event', 'boom');
    evt.on('tracked', function(err, resp) {
      resp.statusCode.should.eql(200);
      done();
    });
  });
});

