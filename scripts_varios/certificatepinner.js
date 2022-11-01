const-string v11, "sha256/"
invoke-virtual {v10, v11}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
move-result v10
if-eqz v10, :cond_5
.line 162
if-nez v8, :cond_3
invoke-static {v9}, Lokhttp3/CertificatePinner;->sha256(Ljava/security/cert/X509Certificate;)Lokio/ByteString;
move-result-object v8
.line 163
:cond_3
iget-object v10, v4, Lokhttp3/CertificatePinner$Pin;->hash:Lokio/ByteString;
invoke-virtual {v10, v8}, Lokio/ByteString;->equals(Ljava/lang/Object;)Z 
move-result v10
if-nez v10, :cond_0
.line 159
:cond_4
add-int/lit8 v3, v3, 0x1
goto :goto_2
.line 164
:cond_5
iget-object v10, v4, Lokhttp3/CertificatePinner$Pin;->hashAlgorithm:Ljava/lang/String;
 const-string v11, "sha1/"
