const data = {
    messages : [
        {
            severity : 'WARN',
            message : {
                title : 'Warnings!',
                text : 'There are logs with unresolved hosts. Please add required hosts and press "Process unresolved logs"?'
            },
            buttons : [
                {
                    url : '',
                    text : 'Process unresolved logs',
                    id : '1'
                },
                {
                    url : '',
                    text : 'Show unprocessed hosts',
                    id : '2'
                }
            ],
            id : '1'
        },
        {
            severity : 'ALERT',
            message : {
                title : 'Warnings! Achtung',
                text : 'There are logs with unresolved hosts. Please add required hosts and press "Process unresolved logs"?'
            },
            buttons : [
                {
                    url : '',
                    text : 'Process unresolved logs',
                    id : '1'
                },
                {
                    url : '',
                    text : 'Show unprocessed hosts',
                    id : '2'
                }
            ],
            id : '2'
        }
    ],
    statistics : {
        summary : [
            {
                caption : 'EMERGENCY',
                count : 0
            },
            {
                caption : 'ALERT',
                count : 3767
            },
            {
                caption : 'CRITICAL',
                count : 28
            },
            {
                caption : 'ERROR',
                count : 60431
            },
            {
                caption : 'WARN',
                count : 104743
            },
            {
                caption : 'NOTICE',
                count : 99447
            },
            {
                caption : 'INFO',
                count : 820709
            },
            {
                caption : 'DEBUG',
                count : 0
            }
        ],
        logs : [
            {
                date : '2018-04-09',
                count : 100
            },
            {
                date : '2018-04-10',
                count : 110
            },
            {
                date : '2018-04-11',
                count : 150
            },
            {
                date : '2018-04-12',
                count : 135
            },
            {
                date : '2018-04-13',
                count : 105
            },
            {
                date : '2018-04-14',
                count : 144
            },
            {
                date : '2018-04-15',
                count : 90
            },
        ]
    }
}

export default data;