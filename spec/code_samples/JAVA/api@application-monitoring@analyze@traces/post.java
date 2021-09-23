CloseableHttpClient client = HttpClients.createDefault();
String url = "https://unit-tenant.instana.com/api/application-monitoring/analyze/traces";
HttpPost httpPost = new HttpPost(url);
String json = "{"
            + "\"pagination\":{\"retrievalSize\":20,\"offset\":0},"
            + "\"timeFrame\":{\"windowSize\":3600000}"
            + "}"
StringEntity entity = new StringEntity(json);
httpPost.setEntity(entity);
httpPost.setHeader("Accept", "application/json");
httpPost.setHeader("Content-type", "application/json");
httpPost.setHeader("Authorization", "apiToken xxxxxxxx");

CloseableHttpResponse response = client.execute(httpPost);

assertThat(response.getStatusLine().getStatusCode(), equalTo(200));
String traceResult = EntityUtils.toString(response.getEntity());
client.close();
