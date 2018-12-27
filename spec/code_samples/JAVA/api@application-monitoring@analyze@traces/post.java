CloseableHttpClient client = HttpClients.createDefault();
HttpPost httpPost = new HttpPost("http://www.example.com");

String json = "{"id":1,"name":"John"}";
StringEntity entity = new StringEntity(json);
httpPost.setEntity(entity);
httpPost.setHeader("Accept", "application/json");
httpPost.setHeader("Content-type", "application/json");

CloseableHttpResponse response = client.execute(httpPost);
assertThat(response.getStatusLine().getStatusCode(), equalTo(200));
client.close();
