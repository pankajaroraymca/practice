// ------------------------------------------------- What happens when you type url in browser -------------------------------

// Top level mechanism
// 1) DNS Resolution
// 2) TCP three way handshake
// 3) HTTPS upgrade
// 4) HTTP Request Response cycle
// 5) Browser rendering the content.

// ------DNS Resolution-------
// A URL has basically three 4 mail components. E.g https://www.google.com
// 1) Protocol - https (It is stateless, means it should contain all required info.)
// 2) Domain Name ( Second level domain ) - google
// 3) Top level domain - .com, .edu, .org
// 4) Sub domain - www, maps, mail

// Protocol: It is a set of rules that devices over the internet use to communicate with each other.
// Domain Name: Nickname of a website to easily remember the address.
// Top level domain: It is the last part of the url. It tells you about the category, purpose, or location of website.
// Sub domain: what type of services does this server offers.

// In this step, client finds the IP address of the server that hosts the website to retrieve or send data. It is stored in cache TTL ( time to live )
// The domain name resolution stores the ip address of server against their domain name.
// It first check in its browser cache
// If not found, it checks in system cacahe.
// If not found, it checks in router cache
// if now found, it makes a request to the ISP to get the assosiated IP address.
// If still not found, there are 13 root servers (domain name resultion servers) worldwide.

// -------TCP three way hanshake-------
// TCP( Transmission control protocol ) is a underlying protocol in HTTP. It is used to establish and main the connection between the server and the client.
// It handles error detection and re transmission of data packets.

// The client performs a three-way handshake with the server to establish a TCP connection. 
// TCP requires a three-way handshake because of the bi-directional communication channel. 
// If you make a two-way handshake, you can only start a single-directional communication channel.

// How connection is establish?
// client send a SYN req to the server with some random number x. server SYN-ACK it responds with x+1 and also return another random number y
// client ACKS it and send another req with y+1. Server SYN-ACK it.

// This is 3 way handshake. client --> server --> client -->server. Total 3 requests.

// -------------- HTTPS UPGRADE ----------------

// HTTPS  is an extended version of http. It is a secure version of it. Any data transfered over http is not secure.
// In between data can be stolen or malformed . This is knwon an man in the middle attacks. To prevent it https connection should be used.

// That's why client must upgrade its connection to HTTPS. How it is done?

// the client makes a request to server. the serven sends it certificate (CERT) which contains public key signed by google certificate authority.
// the client then generate a private key and encrypts this private key with that public key present in cert.
// then on the server side, only server can decrypt it becuase it has used asymentric encryption technique. It has the private key to decrypt client request.
// Now both server and client has this private key. Further request will be encrypted using this private key and only server and client can decrypt the request/response/
// Thus man in the middle attacks are avoided.

// ---------- HTTP Req/Response

// Then client sends the req to the server with http headers and body.
// the servers responds witht the https response headers, status and content.
// 100-199: Info status
// 200-299: Success
// 300-399: redirectional
// 400-499: client side errors
// 500-599: server errors

// Most popular http headers
// cache-control
// user-agent
// authorization
// content-type
// content-encoding
// method
// cookie
// set-cookie
// accept

// -------------- Browser rendering the response from the server-----
// The browser might make multiple HTTP Requests to the server to fetch all the relevant data for a website such as Cascading Style Sheets (CSS), 
// JavaScript files, Images, or Videos. Finally, the browser renders the HTML and the content received from the server.