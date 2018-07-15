((pollingController) => {

    var worldcupPollContract = "";
    pollingController.init = () => {
        if (web3 != "undefined")
            web3 = new Web3(web3.currentProvider)
        else
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

        worldcupPollContract = web3.eth.contract(contractABI).at(contractAddress);

        pollingController.getAllPoll();
        pollingController.watchPolling();
        // web3.eth.defaultAccount;
    }
    pollingController.getBalance = () => {
        return new Promise((resolve, reject) => {
            web3.eth.getBalance(web3.eth.defaultAccount, (err, res) => {
                if (!err)
                    resolve(res)
            });
        })
    }
    pollingController.poll = (e) => {
        var polledValue = document.querySelector("input[name='winnerRadio']:checked").value
        pollingController.getBalance()
            .then(balance => {
                if (balance > 0) {
                    return pollingController.checkIsVoted();
                }
                else {
                    throw ("Sorry!! you have no enough balance")
                }
            })
            .then(myPoll => {
                var alreadyVoted = "You Have already voted or something went wrong";
                if (!myPoll)
                    worldcupPollContract.doVote.sendTransaction(Boolean(+polledValue), (err, response) => {
                        if (!err) {
                            alert("Thank you for voting")
                            pollingController.getAllPoll();
                        }
                        else
                            throw(alreadyVoted)
                    })
                else
                    throw(alreadyVoted)
            })
            .catch(err => {
                alert(err)
            })


    }
    // pollingController.signPollTransaction = (polledValue) => {
    //     var callABI = worldcupPollContract.methods.doVote(Boolean(+polledValue)).encodeABI()
    //     worldcupPollContract.methods.doVote(Boolean(+polledValue)).estimateGas().then(console.log);
    //
    //     web3.eth.accounts.signTransaction({
    //         to: contractAddress,
    //         value: '0',
    //         gas: "49010",
    //         gasPrice: 1,
    //         data: callABI
    //     }, "0x" + privateKey)
    //         .then(txserialzed => {
    //             console.log(txserialzed.rawTransaction)
    //             web3.eth.sendSignedTransaction(txserialzed.rawTransaction)
    //                 .on('receipt', console.log);
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    pollingController.checkIsVoted = () => {
        return new Promise((resolve, reject) => {
            worldcupPollContract.isVoted({from: web3.eth.defaultAccount}, (err, response) => {
                if (!err)
                    resolve(response)
                else
                    reject(err);
            });
        })
    }
    pollingController.getMyPoll = () => {
        worldcupPollContract.getMyVote({from: web3.eth.defaultAccount}, (err, response) => {
            if (!err)
                alert("you voted " + response)
            else
                alert("Sorry !! you have not voted");
        });
    }

    pollingController.getAllPoll = () => {
        worldcupPollContract.getVoteCount((err, response) => {
            if (!err) {
                pollingController.drawChart(response)

            }
        });
    }
    pollingController.watchPolling = () => {
        var pollingEvent = worldcupPollContract.VotedEvent();
        pollingEvent.watch((err, response) => {
            if (!err) {
                document.getElementById("votedBy").innerText = response.args.votedBy;
                var votedFor = response.args.votedFor ? "France" : "Croatia";
                document.getElementById("votedFor").innerText = votedFor;
                //pollingController.getAllPoll();
            }
        })
    }
    pollingController.drawChart = (pollResult) => {
        document.getElementById("totalVotes").innerText = +pollResult[0] + +pollResult[1];
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["France", "Croatia"],
                datasets: [{
                    label: '# WorldCup Final Match Poll',
                    data: [pollResult[0], pollResult[1]],
                    backgroundColor: [

                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)'

                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255,99,132,1)',

                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    pollingController.init();

})(pollingController);