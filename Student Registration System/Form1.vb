Imports System.Data.OleDb

Public Class Form1
    Dim connectionString As String
    Dim dbconnection As OleDbConnection
    Dim dbadapter As New OleDbDataAdapter
    Dim dbdataset As New DataSet

    Private Sub Form1_FormClosed(sender As Object, e As FormClosedEventArgs) Handles Me.FormClosed
        MainForm.Enabled() = True
        MainForm.Show()
        Me.Hide()
    End Sub

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Me.Text = "Student Registration"
        DisplayNorm()
        DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
    End Sub

    Private Sub DisplayNorm()
        Label1.Text = "Student ID"
        Label2.Text = "First Name"
        Label3.Text = "Middle Name"
        Label4.Text = "Last Name"
        Button1.Text = "Add"
        Button2.Text = "Edit"
        Button3.Text = "Delete"
        Button1.Enabled = True
        Button2.Enabled = True
        Button3.Enabled = True
        TextBox1.Enabled = False
        TextBox2.Enabled = False
        TextBox3.Enabled = False
        TextBox4.Enabled = False
        TextBox1.Text = vbNullString
        TextBox2.Text = vbNullString
        TextBox3.Text = vbNullString
        TextBox4.Text = vbNullString
        Button1.Enabled = True 'Repeated Code
        Button2.Enabled = True 'Repeated Code
        Button3.Enabled = True 'Repeated Code
        DataGridView1.AllowUserToAddRows = False

        connectionString = "Provider = Microsoft.Jet.OLEDB.4.0; Data Source = student.mdb;"
        dbconnection = New OleDbConnection(connectionString)
        Try
            dbconnection.Open()
            dbdataset.Clear()
            dbadapter = New OleDbDataAdapter("Select * from StudInfo", connectionString)
            dbadapter.Fill(dbdataset, "StudInfo")
            DataGridView1.DataSource = dbdataset.Tables("StudInfo").DefaultView
            dbconnection.Close()
            Label5.Text = "Connected"
            Label5.ForeColor = Color.LimeGreen
        Catch ex As Exception
            Label5.Text = "Disconnected"
            Label5.ForeColor = Color.Red
        End Try
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If Button1.Text = "Add" Then
            Button1.Enabled = False
            Button2.Text = "Save"
            Button3.Text = "Cancel"
            TextBox2.Text = vbNullString
            TextBox3.Text = vbNullString
            TextBox4.Text = vbNullString
            TextBox2.Enabled = True
            TextBox3.Enabled = True
            TextBox4.Enabled = True
            DataGridView1.AllowUserToAddRows = True
        ElseIf Button1.Text = "Save" Then
            dbconnection.Open()
            Dim dbcommand As New OleDbCommand("UPDATE StudInfo SET 
                FIRSTNAME = '" & TextBox2.Text.Trim & "', 
                MIDDLENAME = '" & TextBox3.Text.Trim & "', 
                LASTNAME = '" & TextBox4.Text.Trim & "' 
                WHERE STUD_ID = " & TextBox1.Text & " ", dbconnection) 'CREATES WHITE SPACES IF NOT IN A SINGLE LINE
            dbcommand.ExecuteNonQuery()
            dbcommand.Dispose()
            dbconnection.Close()
            DisplayNorm()
            MsgBox("Record Save", vbInformation, "Update")
        End If
    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        If Button2.Text = "Edit" Then
            Button2.Enabled = False
            Button1.Text = "Save"
            Button3.Text = "Cancel"
            TextBox2.Enabled = True
            TextBox3.Enabled = True
            TextBox4.Enabled = True
        ElseIf Button2.Text = "Save" Then
            If (TextBox2.Text <> vbNullString And TextBox4.Text <> vbNullString) Then
                dbconnection.Open()
                Dim dbcommand As New OleDbCommand("INSERT INTO StudInfo(FIRSTNAME, MIDDLENAME, LASTNAME) 
                    VALUES ('" + TextBox2.Text.Trim + "','" + TextBox3.Text.Trim + "','" + TextBox4.Text.Trim + "')", dbconnection)
                dbcommand.ExecuteNonQuery()
                dbcommand.Dispose()
                dbconnection.Close()
                DisplayNorm()
                MsgBox("Successful", vbInformation, "Add Record")

            ElseIf (TextBox2.Text = vbNullString) Then
                MsgBox("Enter First Name", vbCritical, "Missing")
            ElseIf (TextBox4.Text = vbNullString) Then
                MsgBox("Enter Last Name", vbCritical, "Missing")
            End If
        ElseIf Button2.Text = "Cancel" Then
            DisplayNorm()
        End If
    End Sub

    Private Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        If Button3.Text = "Delete" Then
            Button1.Enabled = False
            Button2.Enabled = False
            Button3.Enabled = False
            Dim Response = MsgBox("Are you sure to delete the record?", vbYesNo, "Confirmation")

            If Response = vbYes Then
                dbconnection.Open()
                Dim dbcommand As New OleDbCommand("DELETE FROM StudInfo WHERE STUD_ID = " & TextBox1.Text & " ", dbconnection)
                dbcommand.ExecuteNonQuery()
                dbcommand.Dispose()
                dbconnection.Close()
                DisplayNorm()
                MsgBox("Record was permanently deleted", vbInformation, "Successful")
            Else
                DisplayNorm()
            End If
        Else
            DisplayNorm()
        End If
    End Sub

    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        TextBox1.Text = DataGridView1.CurrentRow.Cells(0).Value
        TextBox2.Text = DataGridView1.CurrentRow.Cells(1).Value
        TextBox3.Text = DataGridView1.CurrentRow.Cells(2).Value
        TextBox4.Text = DataGridView1.CurrentRow.Cells(3).Value
    End Sub

End Class

